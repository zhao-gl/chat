interface modalSliceType {
    userinfoVisible: boolean;
    settingVisible: boolean;
}

interface userSliceType {
    name: string;
}

interface stateSliceType {
    modal: modalSliceType
    user: userSliceType
}