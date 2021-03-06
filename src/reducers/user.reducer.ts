import { User } from '../actions/user.actions';
import { ApiRole, ApiUser } from '../models/api-response';
import { getLoggedInState } from '../utility/user-utils';

export interface UserState extends ApiUser {
  activeRole?: ApiRole
  isLoggedIn: boolean
}

export const userInitialState: UserState = {
  edipi: '',
  firstName: '',
  lastName: '',
  phone: '',
  service: '',
  email: '',
  rootAdmin: false,
  isRegistered: false,
  roles: [],
  isLoggedIn: false,
};

export function userReducer(state = userInitialState, action: any): UserState {
  switch (action.type) {
    case User.Actions.Register.type: {
      const { userData, localStorage } = (action as User.Actions.Register).payload;
      const loggedInState = getLoggedInState(userData, localStorage);
      return {
        ...state,
        ...loggedInState,
      };
    }
    case User.Actions.Login.type: {
      const { userData, localStorage } = (action as User.Actions.Login).payload;
      const loggedInState = getLoggedInState(userData, localStorage);
      return {
        ...state,
        ...loggedInState,
      };
    }
    case User.Actions.Logout.type:
      return userInitialState;
    case User.Actions.ChangeOrg.type: {
      const orgId = (action as User.Actions.ChangeOrg).payload.orgId;
      const activeRole = state.roles?.find(role => role.org?.id === orgId);
      return {
        ...state,
        activeRole,
      };
    }
    default:
      return state;
  }
}
