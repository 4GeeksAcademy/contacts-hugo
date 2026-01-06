import { Link } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";

export default function ContactCard({ contact, onDelete }) {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-2 d-flex align-items-center justify-content-center">
          <img src={rigoImageUrl} className="img-fluid rounded-circle" alt="Avatar" style={{ width: "80px", height: "80px", objectFit: "cover" }} />
        </div>

        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title">{contact.name}</h5>
            <p className="card-text mb-1"> <i className="fa fa-map-marker me-2" /> {contact.address}</p>
            <p className="card-text mb-1"> <i className="fa fa-phone me-2" /> {contact.phone} </p>
            <p className="card-text mb-1"> <i className="fa fa-envelope me-2" /> {contact.email} </p>
          </div>
        </div>

        <div className="col-md-3 d-flex flex-column justify-content-center align-items-end pe-4">

          <Link to={`/demo/${contact.id}`} className="btn btn-secondary mb-2"> Edit </Link>

          <button className="btn btn-danger" onClick={() => onDelete(contact.id)}> Delete </button>
        </div>
      </div>
    </div>
  );
}
