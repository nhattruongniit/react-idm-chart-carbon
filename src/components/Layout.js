import React from 'react';
import { Search, Notification, Switcher } from '@carbon/icons-react';
import { Header, HeaderName, HeaderGlobalAction, HeaderGlobalBar } from '@carbon/react';

function Layout({ children }) {
  return (
    <div className="">
      <Header aria-label="IBM Platform Name">
        <HeaderName href="/" prefix="">
          IBM Chart Editor
        </HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="Search" onClick={() => {}}>
            <Search />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Notifications" onClick={() => {}}>
            <Notification />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="App Switcher" onClick={() => {}}>
            <Switcher />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>

      <div className="my-20 px-20">{children}</div>
    </div>
  );
}

export default Layout;
