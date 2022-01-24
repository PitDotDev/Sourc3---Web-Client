export enum SettingsActionTypes {
  DELETE_WALLET = '@@SETTINGS/DELETE_WALLET',
  DELETE_WALLET_SUCCESS = '@@SETTINGS/DELETE_WALLET_SUCCESS',
  DELETE_WALLET_FAILURE = '@@SETTINGS/DELETE_WALLET_FAILURE',

  LOAD_LOGS = '@@SETTINGS/LOAD_LOGS',
  LOAD_LOGS_SUCCESS = '@@SETTINGS/LOAD_LOGS_SUCCESS',
  LOAD_LOGS_FAILURE = '@@SETTINGS/LOAD_LOGS_FAILURE',

  GET_VERSION = '@@SETTINGS/GET_VERSION',
  GET_VERSION_SUCCESS = '@@SETTINGS/GET_VERSION_SUCCESS',
  GET_VERSION_FAILURE = '@@SETTINGS/GET_VERSION_FAILURE',

  LOAD_CONNECTED_SITES = '@@SETTINGS/LOAD_CONNECTED_SITES',
  LOAD_CONNECTED_SITES_SUCCESS = '@@SETTINGS/LOAD_CONNECTED_SITES_SUCCESS',
  LOAD_CONNECTED_SITES_FAILURE = '@@SETTINGS/LOAD_CONNECTED_SITES_FAILURE',

  DISCONNECT_SITE = '@@SETTINGS/DISCONNECT_SITE',
  DISCONNECT_SITE_SUCCESS = '@@SETTINGS/DISCONNECT_SITE_SUCCESS',
  DISCONNECT_SITE_FAILURE = '@@SETTINGS/DISCONNECT_SITE_FAILURE',
}
