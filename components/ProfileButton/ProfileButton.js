import { signOut } from 'next-auth/client';
import { Dropdown, Icon } from 'rsuite';
import styles from './ProfileButton.module.css';
import PropTypes from 'prop-types';

import { LeaveDeptButton } from '../';

import config from '../../lib/config';
import { Roles } from '../../lib/constants';

function ProfileButton({ session }) {
  return (
    <Dropdown title="Your account" icon={<Icon icon="user" />}>
      {/*only show leave option if clinician or department*/}
      {session &&
        (session.user.roles.includes(Roles.USER_TYPE_CLINICIAN) ||
          session.user.roles.includes(Roles.USER_TYPE_DEPARTMENT)) && (
          <Dropdown.Item>
            <LeaveDeptButton />
          </Dropdown.Item>
        )}
      <Dropdown.Item>
        <a
          className={styles.link}
          href={config.KEYCLOAK_USER_ACCOUNT_MANAGE_URL}
          target="_blank"
          rel="noopener">
          Account settings
        </a>
      </Dropdown.Item>
      <Dropdown.Item onSelect={signOut}>Sign out</Dropdown.Item>
    </Dropdown>
  );
}

ProfileButton.propTypes = {
  /** The session of the users webpage, used determine whether to show a LeaveDeptButton */
  session: PropTypes.object.isRequired,
};

export default ProfileButton;
