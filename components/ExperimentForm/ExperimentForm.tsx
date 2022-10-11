import * as React from "react";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { FormValidationError } from "./FormValidationError";
import { displayingErrorMessagesSchema } from "../../utils/errorMessagingSchema";
import { writeExperimentToDB } from "../../api/experiments/createExperiment.api";
import { Dispatch, SetStateAction } from "react";

interface ExperimentFormProps {
  fetchUpdatedData: () => Promise<void>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const ExperimentForm: React.FC<ExperimentFormProps> = ({
  fetchUpdatedData,
  setIsLoading,
}) => {
  return (
    <>
      <Formik
        initialValues={{
          experimentName: "",
          experimentSuccess: "",
          categoryRadios: "",
          durationRadios: "",
        }}
        validationSchema={displayingErrorMessagesSchema}
        onSubmit={async (values, { resetForm }) => {
          setIsLoading(true);
          await writeExperimentToDB(values, fetchUpdatedData);
          resetForm();
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          isValid,
          errors,
          touched,
        }) => (
          <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group controlId="experimentName">
              <Form.Label>Experiment Name</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                value={values.experimentName}
              />
            </Form.Group>
            <FormValidationError
              inputFieldError={errors.experimentName}
              touched={touched.experimentName}
            />
            <Form.Group controlId="categoryRadios" className="mb-3">
              <Form.Check
                name="categoryRadios"
                inline
                label="Mob"
                type="radio"
                id="mob-radio"
                onChange={handleChange}
                value="Mob"
              />
              <Form.Check
                name="categoryRadios"
                inline
                label="Testing"
                type="radio"
                id="testing-radio"
                onChange={handleChange}
                value="Testing"
              />
              <Form.Check
                name="categoryRadios"
                inline
                label="Other"
                type="radio"
                id="other-radio"
                onChange={handleChange}
                value="Other"
              />
              <FormValidationError
                inputFieldError={errors.categoryRadios}
                touched={touched.categoryRadios}
              />
            </Form.Group>
            <Form.Group controlId="experimentSuccess">
              <Form.Label>Success means:</Form.Label>
              <Form.Control
                as="textarea"
                onChange={handleChange}
                value={values.experimentSuccess}
              />
              <FormValidationError
                inputFieldError={errors.experimentSuccess}
                touched={touched.experimentSuccess}
              />
            </Form.Group>
            <Form.Group controlId="durationRadios" className="mb-3">
              <Form.Label>Let's give this a go for:</Form.Label> <br />
              <Form.Check
                name="durationRadios"
                inline
                label="1 week"
                type="radio"
                id="1-week-radio"
                onChange={handleChange}
                value="7"
              />
              <Form.Check
                name="durationRadios"
                inline
                label="2 weeks"
                type="radio"
                id="2-week-radio"
                onChange={handleChange}
                value="14"
              />
              <Form.Check
                name="durationRadios"
                inline
                label="3 weeks"
                type="radio"
                id="3-week-radio"
                onChange={handleChange}
                value="21"
              />
              <Form.Check
                name="durationRadios"
                inline
                label="4 weeks"
                type="radio"
                id="4-week-radio"
                onChange={handleChange}
                value="28"
              />
              <FormValidationError
                inputFieldError={errors.durationRadios}
                touched={touched.durationRadios}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
