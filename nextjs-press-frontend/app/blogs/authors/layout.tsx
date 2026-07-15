import React from 'react';

const AuthorsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      Authors Layout is special only for Authors Route or Nested Routes inside
      the Authors Directory
      {children}
    </div>
  );
};

export default AuthorsLayout;
