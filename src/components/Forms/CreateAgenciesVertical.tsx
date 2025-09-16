import { UIButton } from "../Button";
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputRange } from "./Inputs/InputRange";
import InputText from "./Inputs/InputText";
import InputSelect from "./Inputs/InputSelect";
import RadioGroup from "./Inputs/RadioGroup";

type Status = 'active' | 'inactive';

export interface CreateAgencyFormData {
    agencyName: string;
    totalRevenue: number;
    totalCommission: number;
    totalPlans: number;
    location: string;
    status: Status;
  }

interface Props {
    locations: { value: string; label: string }[];
    onSubmit: (data: CreateAgencyFormData) => void;
    onCancel: () => void;
  }

  const schema = yup.object({
    agencyName: yup.string().required('Agency name is required'),
    totalRevenue: yup.number().min(0).max(1000).required(),
    totalCommission: yup.number().min(0).max(1000).required(),
    totalPlans: yup.number().min(0).max(1000).required(),
    location: yup.string().required('Location is required'),
    status: yup.mixed<Status>().oneOf(['active', 'inactive']).required('Status is required'),
  });


const CreateAgenciesVertical: React.FC<Props> = ({ locations, onSubmit, onCancel }) => {
    const {
      control,
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting, isDirty },
    } = useForm<CreateAgencyFormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        agencyName: '',
        totalRevenue: 500,
        totalCommission: 250,
        totalPlans: 100,
        location: '',
        status: 'active',
      },
    });
  
    const handleFormSubmit = (data: CreateAgencyFormData) => {
      onSubmit(data);
      reset();
    };
  
    const handleCancel = () => {
      reset();
      onCancel();
    };
  
    return (
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="d-flex flex-column h-100"
        noValidate
      >
        <InputText
          name="agencyName"
          label="Agency Name"
          placeholder="Eg. Panama Tours"
          register={register}
          mainClassName="mb-3"
          error={errors.agencyName}
        />
  
        <Controller
          control={control}
          name="totalRevenue"
          render={({ field: { value, onChange } }) => (
            <InputRange label="Total Revenue" value={value ?? 0} onChange={onChange} />
          )}
        />
  
        <Controller
          control={control}
          name="totalCommission"
          render={({ field: { value, onChange } }) => (
            <InputRange label="Total Commission Generated" value={value ?? 0} onChange={onChange} />
          )}
        />
  
        <InputSelect
        label="Location"
        name="location"
        options={locations}
        register={register}
        error={errors.location}
        emptyOptionLabel="Select Location"
        onValueChange={(val) => {
          // console.log('location =>', val);
        }} />
  
        <Controller
          control={control}
          name="totalPlans"
          render={({ field: { value, onChange } }) => (
            <InputRange label="Total Plans Sold" value={value ?? 0} onChange={onChange} />
          )}
        />
  
        {/* Status */}
       <RadioGroup
        name="status"
        label="Status"
        options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]}
        register={register}
        mainClassName="mb-4"
        error={errors.status}
      />
  
        {/* Footer */}
        <div className="mt-auto pt-4 border-top d-flex justify-content-end gap-3">
          <UIButton
            type="button"
            variant="link"
            className="text-secondary text-decoration-none px-4"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </UIButton>
  
          <UIButton
            type="submit"
            variant="primary"
            className="px-4"
            disabled={isSubmitting || !isDirty}
          >
            Create Agency
          </UIButton>
        </div>
      </form>
    );
  };
  
  export default CreateAgenciesVertical;