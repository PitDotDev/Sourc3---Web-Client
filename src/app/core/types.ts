export type Pallete = 'green' | 'ghost' | 'purple' | 'blue' | 'red' | 'white' | 'orange' | 'black' | 'currentRole';

export type ButtonVariant =
  | 'regular'
  | 'ghost'
  | 'block'
  | 'link'
  | 'icon'
  | 'agree'
  | 'menu'
  | 'eye'
  | 'setting'
  | 'switch'
  | 'linkDrop'
  | 'max'
  | 'manage'
  | 'currentRole';

export type AddressType = 'regular' | 'regular_new' | 'max_privacy' | 'offline' | 'public_offline' | 'unknown';
export interface CreateWalletParams {
  seed: string;
  password: string;
  isSeedConfirmed: boolean;
}

export interface ExternalAppConnection {
  appUrl: string;
  appName: string;
}

export interface CreateAddressParams {
  type: AddressType;
  comment?: string;
}

export enum RPCMethod {
  SubUnsub = 'ev_subunsub',
  GetUTXO = 'get_utxo',
  GetAssetInfo = 'get_asset_info',
  GetWalletStatus = 'wallet_status',
  GetAddressList = 'addr_list',
  CreateAddress = 'create_address',
  CalculateChange = 'calc_change',
  ValidateAddress = 'validate_address',
  GetTXList = 'tx_list',
  SendTransaction = 'tx_send',
  GetVersion = 'get_version',
  TxStatus = 'tx_status',
  ExportPaymentProof = 'export_payment_proof',
  VerifyPaymentProof = 'verify_payment_proof',
}

export enum WalletMethod {
  StartWallet = 'wasm_start_wallet',
  CreateWallet = 'wasm_create_wallet',
  DeleteWallet = 'wasm_delete_wallet',
  StopWallet = 'wasm_stop_wallet',
  IsAllowedWord = 'wasm_is_allowed_word',
  IsAllowedSeed = 'wasm_is_allowed_seed',
  GenerateSeed = 'wasm_generate_seed',
  ConvertTokenToJson = 'wasm_convert_token_to_json',
  NotificationConnect = 'notification_connect',
  NotificationAuthenticaticated = 'notification_authenticaticated',
  NotificationApproveInfo = 'notification_approve_info',
  NotificationRejectInfo = 'notification_reject_info',
  NotificationApproveSend = 'notification_approve_send',
  NotificationRejectSend = 'notification_reject_send',
  LoadBackgroundLogs = 'load_background_logs',
  LoadConnectedSites = 'load_connected_sites',
  DisconnectSite = 'disconnect_site',
  WalletLocked = 'wallet_locked',
}

export enum ExternalAppMethod {
  CreateSourc3Api = 'create_sourc3_api',
}
export interface RemoteRequest {
  id: number;
  method: WalletMethod | RPCMethod;
  params: any;
}
export interface RemoteResponse {
  id: number | RPCEvent | BackgroundEvent;
  method: WalletMethod | RPCMethod;
  result: any;
  error: any;
}

export enum BackgroundEvent {
  CONNECTED = 'connected',
  CHANGE_SYNC_STEP = 'change_sync_step',
  DOWNLOAD_DB_PROGRESS = 'download_db_progress',
  RESTORE_DB_PROGRESS = 'restore_db_progress',
  UNLOCK_WALLET = 'unlock_wallet',
  CLOSE_NOTIFICATION = 'close_notification',
}

export enum RPCEvent {
  SYNC_PROGRESS = 'ev_sync_progress',
  ASSETS_CHANGED = 'ev_assets_changed',
  SYSTEM_STATE = 'ev_system_state',
  TXS_CHANGED = 'ev_txs_changed',
}
export interface ToggleSubscribeToParams {
  ev_sync_progress?: boolean;
  ev_system_state?: boolean;
  ev_assets_changed?: boolean;
  ev_addrs_changed?: boolean;
  ev_utxos_changed?: boolean;
  ev_txs_changed?: boolean;
}

// data

export interface ConnectedData {
  is_running: boolean;
  onboarding: boolean;
  notification: Notification;
}

export interface SyncHash {
  is_in_sync: boolean;
  prev_state_hash: string;
  current_height: number;
  current_state_hash: string;
  current_state_timestamp: number;
}

export interface WalletTotal {
  asset_id: number;
  available: number;
  available_str: string;
  maturing: number;
  maturing_str: string;
  receiving: number;
  receiving_str: string;
  sending: number;
  sending_str: string;
}

export interface MetadataPairs {
  N: string;
  NTHUN?: string;
  SCH_VER?: string;
  SN: string;
  UN?: string;
  OPT_COLOR?: string;
}

export interface Asset {
  asset_id: number;
  emission: number;
  emission_str: string;
  isOwned: number;
  lockHeight: number;
  metadata: string;
  metadata_kv: boolean;
  metadata_pairs: MetadataPairs;
  metadata_std: boolean;
  metadata_std_min: boolean;
  ownerId: string;
}

export interface ChangeData {
  asset_change: number;
  asset_change_str: string;
  change: number;
  change_str: string;
  explicit_fee: number;
}

export interface AddressData {
  type: AddressType;
  is_mine: boolean;
  is_valid: boolean;
  payments: number;
  // extra data from token
  amount: number;
  asset_id: number;
  peer_id?: string;
}

export interface SyncProgress extends SyncHash {
  sync_requests_done: number;
  sync_requests_total: number;
  tip_height: number;
  tip_prev_state_hash: string;
  tip_state_hash: string;
  tip_state_timestamp: number;
}

export interface WalletStatus extends SyncHash {
  available: number;
  difficulty: number;
  maturing: number;
  receiving: number;
  totals: WalletTotal[];
}

// events

export enum TxStatusString {
  IN_PROGRESS = 'in progress',
  RECEIVING = 'receiving',
  SENDING = 'sending',
  PENDING = 'pending',
  WAITING_FOR_RECEIVER = 'waiting for receiver',
  WAITING_FOR_SENDER = 'waiting for sender',
  SENT = 'sent',
  RECEIVED = 'received',
  CANCELED = 'cancelled',
  EXPIRED = 'expired',
  FAILED = 'failed',
  COMPLETED = 'completed',
  SELF_SENDING = 'self sending',
  SENT_TO_OWN_ADDRESS = 'sent to own address',
  SENT_OFFLINE_TO_OWN_ADDRESS = 'sent offline to own address',

  SENT_OFFLINE = 'sent offline',
  RECEIVED_OFFLINE = 'received offline',
  CANCELED_OFFLINE = 'canceled offline',
  IN_PROGRESS_OFFLINE = 'in progress offline',
  FAILED_OFFLINE = 'failed offline',

  SENT_MAX_PRIVACY = 'sent max privacy',
  RECEIVED_MAX_PRIVACY = 'received max privacy',
  CANCELED_MAX_PRIVACY = 'canceled max privacy',
  IN_PROGRESS_MAX_PRIVACY = 'in progress max privacy',
  FAILED_MAX_PRIVACY = 'failed max privacy',

  IN_PROGRESS_PUBLIC_OFFLINE = 'in progress public offline',
  FAILED_PUBLIC_OFFLINE = 'failed public offline',
  SENT_PUBLIC_OFFLINE = 'sent public offline',
  CANCELED_PUBLIC_OFFLINE = 'canceled public offline',
  RECEIVED_PUBLIC_OFFLINE = 'received public offline',
}

export enum TxStatus {
  PENDING,
  IN_PROGRESS,
  CANCELED,
  COMPLETED,
  FAILED,
  REGISTERING,
}

export enum TxType {
  SIMPLE = 0,
  ASSET_ISSUE = 2,
  ASSET_CONSUME = 3,
  ASSET_INFO = 6,
  PUSH_TX = 7,
  CONTRACT = 12,
}

export interface Amount {
  amount: number;
  asset_id: number;
}
export interface Contract {
  amounts?: Amount[];
  contract_id: string;
}

export interface Transaction {
  asset_id: number;
  comment: string;
  confirmations: number;
  create_time: number;
  fee: number;
  fee_only: boolean;
  height: number;
  income: boolean;
  kernel: string;
  receiver: string;
  sender: string;
  status: TxStatus;
  status_string: TxStatusString;
  txId: string;
  tx_type: TxType;
  tx_type_string: string;
  value: number;
  invoke_data: Contract[];
  appname: string;
  rates: Rate[];
}

export interface Rate {
  from: string | number;
  rate: number;
  rate_str: string;
  to: string;
}
export interface TransactionDetail extends Transaction {
  failure_reason: string;
  sender_identity: string;
  receiver_identity: string;
  token: string;
  address_type: AddressType;
}

export interface WalletChangeEvent {
  change: number;
  change_str: string;
}
export interface AssetsEvent extends WalletChangeEvent {
  assets: Asset[];
}

export interface TxsEvent extends WalletChangeEvent {
  txs: Transaction[];
}

export enum NotificationType {
  CONNECT = 'connect',
  APPROVE_INVOKE = 'approve_invoke',
  APPROVE_TX = 'approve_tx',
  AUTH = 'auth',
}

export interface NotificationParams {
  appname?: string;
  info?: string;
  amounts?: string;
  req?: string;
  apiver?: string;
  apivermin?: string;
  appurl?: string;
}

export interface Notification {
  type: NotificationType;
  params: NotificationParams;
}

export enum Environment {
  POPUP = 'popup',
  NOTIFICATION = 'notification',
  FULLSCREEN = 'fullscreen',
  BACKGROUND = 'background',
  CONTENT = 'content',
  CONTENT_REQ = 'content_req',
}

export interface ConnectRequest {
  type: string;
  apiver: string;
  apivermin: string;
  appname: string;
  is_reconnect: boolean;
}

export interface SendTransactionParams {
  value: number;
  fee?: number;
  from?: string;
  address: string;
  comment?: string;
  asset_id?: number;
  offline?: boolean;
}

export interface PaymentProof {
  amount: number;
  asset_id: number;
  is_valid: boolean;
  kernel: string;
  receiver: string;
  sender: string;
  payment_proof: string;
  rates: Rate[];
}
