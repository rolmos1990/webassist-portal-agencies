import logo from '../assets/images/logo2.png';
import CreateNewPasswordForm from '../components/Forms/CreateNewPasswordForm';
import { useState } from 'react';
import UIModal from '../components/UIModal';

const CreateNewPassword = () => {

  const [open, setOpen] = useState(true);

  return (
    <>
            <UIModal
            show={open}
            onClose={() => setOpen(false)}
            icon="success"
            title="Password Reset Successful"
            subtitle="You have successfully updated your password."
            primaryLabel="Done"
            onPrimaryClick={() => setOpen(false)}
            backdrop="static"
            keyboard={true}
            />

            <section className="container bg-white border rounded-4 p-5 col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="mb-4">
              <img src={logo} alt="We Assist logo" />
            </div>
            <div className="d-flex flex-column">
              <h1 className="fw-bold fs-3">Create a new password</h1>
              <p className="text-secondary">New password must be different from current password</p>
            </div>
            <CreateNewPasswordForm onSubmit={(data) => setOpen(true)} />
          </section>
    </>
)};

export default CreateNewPassword;