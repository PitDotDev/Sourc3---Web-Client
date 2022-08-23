/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Transactions } from '@app/containers/Transactions';

import { Window } from '@app/shared/components';
import { Content, TabItem, TabsMenu } from '@app/shared/components/TabsMenu';

const Activity = () => {
  const [selectedId, setSelectedId] = useState(2);
  const toggleTabs = (idx) => {
    setSelectedId(idx);
  };

  const renderContent = (i) => {
    switch (i) {
      case 1:
        return (
          <Content>
            <p>Activity</p>
          </Content>
        );
      case 2:
        return (
          <Content>
            <Transactions />
          </Content>
        );
      default:
        return (
          <>
            <p>Activity</p>
          </>
        );
    }
  };
  return (
    <Window type="pageMain">
      <>
        <TabsMenu>
          <TabItem active={selectedId === 1} onClick={() => toggleTabs(1)}>
            Activity
          </TabItem>
          <TabItem active={selectedId === 2} onClick={() => toggleTabs(2)}>
            Transactions
          </TabItem>
        </TabsMenu>
        {renderContent(selectedId)}
      </>
    </Window>
  );
};

export default Activity;
