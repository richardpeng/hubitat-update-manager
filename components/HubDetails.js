const HubDetails = ({ details }) => <ul>
  {Object.keys(details).map((key, i) => (<li key={i}>
    <strong>{key}:</strong> {details[key]}
  </li>))}
</ul>

export default HubDetails;
