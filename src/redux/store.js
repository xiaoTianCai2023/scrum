import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slice/login';
import projectReducer from './slice/project';
import dropReducer from './slice/drop'
import kanbanReducer from './slice/kanban'
import epicReducer from './slice/epic'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    project: projectReducer,
    drop: dropReducer,
    kanban: kanbanReducer,
    epic: epicReducer
  },
});