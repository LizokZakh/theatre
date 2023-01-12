import Dropdown from 'react-bootstrap/Dropdown';

function UserDropdown({user, setUser}) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {user.name} {user.surname}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => {console.log(user); setUser(undefined)}}>Выйти</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropdown;