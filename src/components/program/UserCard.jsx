import PropTypes from "prop-types";

const UserCard = (props) => {
    return (
    <div className={`p-5 rounded-lg m-2.5 max-w-64 border-2 ${props.isActive ? 'border-green-500' : 'border-gray-500'}`}>
      <h3 className="text-xl font-semibold mb-2 text-black">{props.name}</h3>
      <p className="text-black"><strong>Role:</strong> {props.role}</p>
      <p className="text-black"><strong>Age:</strong> {props.age}</p>
      
      {/* Conditional rendering based on a boolean prop */}
      {props.isActive ? <span className="text-green-500">● Online</span> : <span className="text-gray-500">○ Offline</span>}
    </div>
    );
}

UserCard.propTypes = {
    isActive: PropTypes.bool,
    name: PropTypes.string,
    role: PropTypes.string,
    age: PropTypes.number,
};

export default UserCard;