use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{
    to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult, Addr,
};
use cw_storage_plus::{Map, Item};

// State
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Attestation {
    pub gpa_hash: String,
    pub issuer: String,
    pub submitter: String,
    pub timestamp: u64,
}

pub const ADMIN: Item<Addr> = Item::new("admin");
pub const ATTESTS: Map<&str, Attestation> = Map::new("attests");

// Instantiate
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
    pub admin: String,
}

// Execute messages
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub enum ExecuteMsg {
    Register { gpa_hash: String, issuer: String },
    Remove { gpa_hash: String },
}

// Query messages
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub enum QueryMsg {
    GetAttestation { gpa_hash: String },
    ListAttestations {},
}

// Query responses
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct AttestationResponse {
    pub attestation: Option<Attestation>,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct ListResponse {
    pub attestations: Vec<Attestation>,
}

#[cfg_attr(not(feature = "library"), cosmwasm_std::entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    let admin = deps.api.addr_validate(&msg.admin)?;
    ADMIN.save(deps.storage, &admin)?;
    Ok(Response::new().add_attribute("method", "instantiate"))
}

#[cfg_attr(not(feature = "library"), cosmwasm_std::entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> StdResult<Response> {
    match msg {
        ExecuteMsg::Register { gpa_hash, issuer } => try_register(deps, env, info, gpa_hash, issuer),
        ExecuteMsg::Remove { gpa_hash } => try_remove(deps, env, info, gpa_hash),
    }
}

pub fn try_register(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    gpa_hash: String,
    issuer: String,
) -> StdResult<Response> {
    let att = Attestation {
        gpa_hash: gpa_hash.clone(),
        issuer: issuer.clone(),
        submitter: info.sender.to_string(),
        timestamp: env.block.time.seconds(),
    };
    ATTESTS.save(deps.storage, &gpa_hash, &att)?;
    Ok(Response::new().add_attribute("method", "register").add_attribute("gpa_hash", gpa_hash))
}

pub fn try_remove(deps: DepsMut, _env: Env, info: MessageInfo, gpa_hash: String) -> StdResult<Response> {
    let admin = ADMIN.load(deps.storage)?;
    if info.sender != admin {
        return Err(cosmwasm_std::StdError::generic_err("unauthorized"));
    }
    ATTESTS.remove(deps.storage, &gpa_hash);
    Ok(Response::new().add_attribute("method", "remove").add_attribute("gpa_hash", gpa_hash))
}

#[cfg_attr(not(feature = "library"), cosmwasm_std::entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetAttestation { gpa_hash } => to_binary(&query_attestation(deps, gpa_hash)?),
        QueryMsg::ListAttestations {} => to_binary(&query_list(deps)?),
    }
}

pub fn query_attestation(deps: Deps, gpa_hash: String) -> StdResult<AttestationResponse> {
    let res = ATTESTS.may_load(deps.storage, &gpa_hash)?;
    Ok(AttestationResponse { attestation: res })
}

pub fn query_list(deps: Deps) -> StdResult<ListResponse> {
    let mut list: Vec<Attestation> = vec![];
    let keys = ATTESTS.keys(deps.storage, None, None)?;
    for k in keys {
        if let Some(att) = ATTESTS.may_load(deps.storage, &k)? {
            list.push(att);
        }
    }
    Ok(ListResponse { attestations: list })
}
