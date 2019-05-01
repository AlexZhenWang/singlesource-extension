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

import React, { PureComponent } from 'react';
import AccountItem from '../../components/account-item';
import { Container, Content, Title, Items } from './style';
import { Account } from '../../types/account';

type Props = {
  accounts: Account[];
  onSelectAccount: (account: Account) => void;
};

class DashboardPage extends PureComponent<Props> {
  render() {
    const { accounts, onSelectAccount } = this.props;
    return (
      <Container>
        <Content>
          <Title>Account dashboard</Title>
          <Items>
            {accounts.map(account => (
              <AccountItem
                key={account.address}
                account={account}
                onClick={() => onSelectAccount(account)}
              />
            ))}
          </Items>
        </Content>
      </Container>
    );
  }
}

export default DashboardPage;
