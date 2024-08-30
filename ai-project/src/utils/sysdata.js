import { useSysdataStore } from '@/store/sysdata';

const sysdataStore = useSysdataStore();

export function getSystemUserOptionList() {
  return sysdataStore.systemUserOptions;
}

export function getSystemUserMapData() {
  return sysdataStore.systemUserData;
}

export function getUserLabelByUserCode(userCode) {
  const userData = sysdataStore.systemUserData;
  if (userData && userData[userCode]) {
    return userData[userCode];
  }
  return userCode;
}
