import { APP_VERSION, APP_ENV } from '../lib/appInfo';

export function VersionEnvInfo() {
  return (
    <div style={{ fontSize: '0.85em', color: '#888', textAlign: 'right', margin: '8px 0' }}>
      Version: {APP_VERSION} | Env: {APP_ENV}
    </div>
  );
}
