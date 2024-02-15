import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import modalReducer from '@/features/modal/modalSlice';
import roleReducer from '@/features/roles/rolesSlice';
import inviteMemberReducer from '@/features/inviteMember/inviteMemberSlice';
import questionBanksReducer from '@/features/interviews/interviewsSlice';
import interviewDetailReducer from '@/features/interviewDetail/interviewDetailSlice';
import userReducer from '@/features/authentication/authenticationSlice';
import workSpaceReducer from '@/features/workspace/userWorkspaceSlice';
import memberReducer from '@/features/members/memberSlice';
import notesReducer from '@/features/interviews/notesSlice';
import { authAPI } from '@/features/authentication/authenticationAPI';
import videoCallReducer from '@/features/videoCall/videoCallSlice';
import { userAPI } from '@/features/settingsDetail/userSettingsAPI';
import { templatesAPI } from '@/features/templates/templatesAPISlice';
import { QuestionsAPI } from '@/features/questions/questionsAPISlice';
import { templateQuestionsAPI } from '@/features/templates/templatesQuestionsAPISlice';
import questionsBankSliceReducer from '@/features/questions/questionBankSlice';
import departmentReducer from '@/features/departments/departmentSlice';
import { departmentsAPI } from '@/features/departments/departmentsAPI';
import companyReducer from '@/features/company/companySlice';
import { companyAPI } from '@/features/company/companyAPI';

export const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [templatesAPI.reducerPath]: templatesAPI.reducer,
    [QuestionsAPI.reducerPath]: QuestionsAPI.reducer,
    [templateQuestionsAPI.reducerPath]: templateQuestionsAPI.reducer,
    [companyAPI.reducerPath]: companyAPI.reducer,
    [departmentsAPI.reducerPath]: departmentsAPI.reducer,
    user: userReducer,
    workspace: workSpaceReducer,
    company: companyReducer,
    department: departmentReducer,
    member: memberReducer,
    videoCall: videoCallReducer,
    modal: modalReducer,
    role: roleReducer,
    notes: notesReducer,
    inviteMember: inviteMemberReducer,
    questionBanks: questionBanksReducer,
    interviewDetail: interviewDetailReducer,
    questionsBankSlice: questionsBankSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authAPI.middleware,
      userAPI.middleware,
      templatesAPI.middleware,
      QuestionsAPI.middleware,
      templateQuestionsAPI.middleware,
      departmentsAPI.middleware,
      companyAPI.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
