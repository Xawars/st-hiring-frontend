import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import type { AppDispatch, RootState } from '../../store.ts';
import type { Settings } from '../../types/settings.ts';
import { saveSettings } from './settingsSlice.ts';

const settingsSchema = Yup.object({
  siteName: Yup.string().required('Site name is required'),
  contactEmail: Yup.string()
    .email('Enter a valid email address')
    .required('Contact email is required'),
  maintenanceMode: Yup.boolean().required(),
});

const emptySettings: Settings = {
  siteName: '',
  contactEmail: '',
  maintenanceMode: false,
};

export default function SettingsForm() {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.settings.settings);
  const missing = useSelector((state: RootState) => state.settings.missing);
  const error = useSelector((state: RootState) => state.settings.error);
  const saving = useSelector((state: RootState) => state.settings.saving);
  const saveSuccess = useSelector((state: RootState) => state.settings.saveSuccess);
  const saveError = useSelector((state: RootState) => state.settings.saveError);

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
        <Alert severity="error" sx={{ overflowWrap: 'anywhere' }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!settings && !missing) {
    return null;
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <Paper sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontSize: { xs: '1.35rem', sm: '1.5rem' } }}
        >
          Settings
        </Typography>
        {missing && (
          <Alert severity="info" sx={{ mb: { xs: 2, sm: 3 } }}>
            No settings have been configured yet.
          </Alert>
        )}
        {saveSuccess && (
          <Alert severity="success" sx={{ mb: { xs: 2, sm: 3 } }}>
            Settings saved successfully.
          </Alert>
        )}
        {saveError && (
          <Alert severity="error" sx={{ mb: { xs: 2, sm: 3 } }}>
            {saveError}
          </Alert>
        )}
        <Formik<Settings>
          initialValues={settings ?? emptySettings}
          validationSchema={settingsSchema}
          onSubmit={async (values) => {
            await dispatch(saveSettings(values));
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={{ xs: 2, sm: 3 }}>
                <TextField
                  id="siteName"
                  name="siteName"
                  label="Site name"
                  fullWidth
                  value={values.siteName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.siteName && errors.siteName)}
                  helperText={touched.siteName && errors.siteName}
                />
                <TextField
                  id="contactEmail"
                  name="contactEmail"
                  label="Contact email"
                  type="email"
                  autoComplete="email"
                  fullWidth
                  value={values.contactEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.contactEmail && errors.contactEmail)}
                  helperText={touched.contactEmail && errors.contactEmail}
                />
                <FormControlLabel
                  control={
                    <Switch
                      name="maintenanceMode"
                      checked={values.maintenanceMode}
                      onChange={(_event, checked) => {
                        setFieldValue('maintenanceMode', checked);
                      }}
                      onBlur={handleBlur}
                    />
                  }
                  label="Maintenance mode"
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={saving}
                  sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' } }}
                >
                  Submit
                </Button>
              </Stack>
            </Box>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}
