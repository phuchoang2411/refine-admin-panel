import { ErrorComponent, Refine } from '@refinedev/core';

import {
  ThemedLayoutV2,
  useNotificationProvider,
  ThemedTitleV2,
} from '@refinedev/antd';

import '@refinedev/antd/dist/reset.css';

import routerBindings, { NavigateToResource } from '@refinedev/react-router-v6';
import dataProvider from '@refinedev/simple-rest';
import { App as AntdApp } from 'antd';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import { PostCreate, PostEdit, PostList, PostShow } from './pages';

function App() {
  return (
    <BrowserRouter>
      <AntdApp>
        <Refine
          notificationProvider={useNotificationProvider}
          routerProvider={routerBindings}
          dataProvider={dataProvider('https://api.fake-rest.refine.dev')}
          resources={[
            {
              name: 'posts',
              list: PostList,
              show: PostShow,
              create: PostCreate,
              edit: PostEdit,
              meta: {
                canDelete: true,
              },
            },
          ]}
        >
          <Routes>
            <Route
              element={
                <ThemedLayoutV2
                  Title={({ collapsed }) => (
                    <ThemedTitleV2 collapsed={collapsed} text="Admin" />
                  )}
                >
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              <Route index element={<NavigateToResource resource="posts" />} />
              <Route path="posts">
                <Route index element={<PostList />} />
                <Route path="create" element={<PostCreate />} />
                <Route path="edit/:id" element={<PostEdit />} />
                <Route path="show/:id" element={<PostShow />} />
              </Route>
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </Refine>
      </AntdApp>
    </BrowserRouter>
  );
}

export default App;
