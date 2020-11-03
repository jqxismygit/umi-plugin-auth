import { join } from 'path';
import { IApi } from '@umijs/types';
import { utils } from 'umi';
const DIR_NAME = 'plugin-auth';

const AuthContent = `
import React from 'react';
import { usePassport } from '@sensoro/core';

export default (props) => {
  const {children} = props;
  const passport = usePassport();
  const {profile, merchant} = passport;
  return (
    <>
      {profile && merchant && children}
    </>
  );
};

`;

export default function(api: IApi) {
  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: join(DIR_NAME, 'auth.tsx'),
      content: AuthContent,
    });
  });

  api.modifyRoutes(routes => {
    return [
      {
        path: '/',
        component: utils.winPath(
          join(api.paths.absTmpPath || '', DIR_NAME, 'auth.tsx'),
        ),
        routes,
      },
    ];
  });
}
