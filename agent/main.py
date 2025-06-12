from automata_operator import AutomataOperator
from browser_use_agent import BrowserUseAgent

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('-m', '--miner-uid', type=int, required=True)
    args = parser.parse_args()
    operator = AutomataOperator(agent_class=BrowserUseAgent)
    operator.run(port=5000 + args.miner_uid)