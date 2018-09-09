import { AnyAction, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';

interface IAppPropsExtended extends IState, RouteComponentProps<any> {}
