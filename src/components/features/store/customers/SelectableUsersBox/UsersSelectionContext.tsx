"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../customer.types";

type UsersSelectionContextType = {
  selectedUsers: User[];
  addUser: (user: User) => void;
  removeUser: (userId: number) => void;
  setUsers: (users: User[]) => void;
};

const UsersSelectionContext = createContext<UsersSelectionContextType | null>(
  null
);

export const useUsersSelection = () => {
  const context = useContext(UsersSelectionContext);
  if (!context)
    throw new Error(
      "useUsersSelection must be used within UsersSelectionProvider"
    );
  return context;
};

export const UsersSelectionProvider: React.FC<{
  initialUsers?: User[];
  children: React.ReactNode;
}> = ({ initialUsers = [], children }) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>(initialUsers);

  const addUser = (user: User) => {
    setSelectedUsers((prev) => [...prev.filter((u) => u.id !== user.id), user]);
  };

  const removeUser = (userId: number) => {
    setSelectedUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const setUsers = (users: User[]) => {
    setSelectedUsers(users);
  };

  return (
    <UsersSelectionContext.Provider
      value={{ selectedUsers, addUser, removeUser, setUsers }}
    >
      {children}
    </UsersSelectionContext.Provider>
  );
};
