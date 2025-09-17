import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { UIButton } from "../Button";
import InputText from "./Inputs/InputText";
import InputDate from './Inputs/InputDate';
import InputSelect from './Inputs/InputSelect';

type FormValues = {
  agencyCountry: string;
  lineOfBusiness: string;
  program: string;
  plan: string;
  agency: string;
  agent: string;
  periodStart: Date | null;
  periodEnd: Date | null;
};

const schema = yup.object({
    agencyCountry: yup.string().default(''),
    lineOfBusiness: yup.string().default(''),
    program: yup.string().default(''),
    plan: yup.string().default(''),
    agency: yup.string().default(''),
    agent: yup.string().default(''),
    periodStart: yup.date().nullable().default(null),
    periodEnd: yup.date().nullable().default(null),
});

interface FilterByAgencyFormProps {
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
}

const FilterByAgencyForm: React.FC<FilterByAgencyFormProps> = ({ onSubmit, onCancel = () => {} }) => {
    const {
        register,
        handleSubmit,

        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: schema.cast({}, { assert: true }),
    });

    const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
        onSubmit({
            ...data,
            periodStart: data.period || null,
            periodEnd: data.periodEnd || null,
        });
    };


    const handleCancel = () => {
        reset();
        onCancel();
    };

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit as any)}
            className="py-3"
            noValidate
        >
            <InputSelect
                label="Agency Country"
                name="agencyCountry"
                options={[]}
                register={register}
                error={errors.agencyCountry}
                mainClassName="mb-3"
            />

            <InputSelect
                label="Line of Business"
                name="lineOfBusiness"
                options={[]}
                register={register}
                error={errors.lineOfBusiness}
                mainClassName="mb-3"
            />

            <InputSelect
                label="Program"
                name="program"
                options={[]}
                register={register}
                error={errors.program}
                mainClassName="mb-3"
            />

            <InputSelect
                label="Plan"
                name="plan"
                options={[]}
                register={register}
                error={errors.plan}
                mainClassName="mb-3"
            />

            <InputSelect
                label="Agency"
                name="agency"
                options={[]}
                register={register}
                error={errors.agency}
                mainClassName="mb-3"
            />

            <InputSelect
                label="Agent"
                name="agent"
                options={[]}
                register={register}
                error={errors.agent}
                mainClassName="mb-3"
            />

            <InputDate
            mode="range"
            label="Period"
            nameStart="periodStart"
            nameEnd="periodEnd"
            register={register}
            errorStart={errors.periodStart}
            errorEnd={errors.periodEnd}
            placeholder="Start — End"
            />

<div className="mt-auto pt-4 d-flex justify-content-end gap-3">
        <UIButton
          type="button"
          variant="link"
          pill
          className="text-secondary text-decoration-none px-4"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancel
        </UIButton>

        <UIButton
          type="submit"
          variant="primary"
          pill
          className="px-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Filtering...' : 'Apply Filters'}
        </UIButton>
      </div>
  
        </form>
    );
  };
  
  export default FilterByAgencyForm;