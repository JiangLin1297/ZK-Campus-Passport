#!/usr/bin/env python3
"""Simple ZK proof stub (simulated) for demo purposes.
Generates a JSON 'proof' file indicating that sdkey participated in event.

This is NOT a real ZK proof. Replace with real circuit/prover when implementing.
"""
import argparse, json, os, time
def main():
    p = argparse.ArgumentParser()
    p.add_argument('--event', required=True)
    p.add_argument('--sdkey', required=True)
    p.add_argument('--award', default='participant')
    args = p.parse_args()
    out = {
        'event': args.event,
        'sdkey': args.sdkey,
        'award': args.award,
        'proof_generated_at': int(time.time())
    }
    os.makedirs('proofs', exist_ok=True)
    fname = f'proofs/proof_{args.event}_{args.sdkey}.json'
    with open(fname,'w') as f:
        json.dump(out,f,indent=2)
    print('Generated proof:', fname)
if __name__=='__main__':
    main()
