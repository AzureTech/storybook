import { UPDATE_GLOBAL_ARGS, GLOBAL_ARGS_UPDATED } from '@storybook/core-events';
import { Args, ModuleFn } from '../index';

export interface SubState {
  globalArgs: Args;
}

export interface SubAPI {
  updateGlobalArgs: (newGlobalArgs: Args) => void;
}

export const init: ModuleFn = ({ store, fullAPI }) => {
  const updateGlobalArgs = (newGlobalArgs: Args) => {
    fullAPI.emit(UPDATE_GLOBAL_ARGS, newGlobalArgs);
  };

  const api: SubAPI = {
    updateGlobalArgs,
  };

  const state: SubState = {
    // Currently global args always start empty. TODO -- should this be set on the channel at init time?
    globalArgs: {},
  };

  const init = () => {
    fullAPI.on(GLOBAL_ARGS_UPDATED, (globalArgs: Args) => store.setState({ globalArgs }));
  };

  return {
    api,
    state,
    init,
  };
};
