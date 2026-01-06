export default function ContactForm({
  name,
  email,
  phone,
  address,
  setName,
  setEmail,
  setPhone,
  setAddress,
  onSubmit,
  buttonText = "Save changes",
}) {

  const handleInternalSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleInternalSubmit}>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Full Name</label>
        <div className="col-sm-10">
          <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Phone</label>
        <div className="col-sm-10">
          <input className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone" required />
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Address</label>
        <div className="col-sm-10">
          <input className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" required />
        </div>
      </div>

      <button className="btn btn-primary" type="submit">
        {buttonText}
      </button>
    </form>
  );
}
