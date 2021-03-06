/**
 * Copyright 2019 Centrality Investments Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export type Transaction = {
  hash: string;
  blockNumber: number;
  blockHash: string;
  fromAddress: string;
  fromAddressBalance: string;
  toAddress: string;
  toAddressBalance: string;
  value: string;
  fee: number;
  nonce: number;
  size: number;
  status: boolean;
  timestamp: number;
  assetId: number;
  transactionFlow: string;
  assetSymbol: string;
};

export type TransactionsState = {
  [address: string]: {
    [assetId: number]: {
      transactions: { [txHash: string]: Transaction };
      loading: boolean;
      error?: Error;
    };
  };
};
