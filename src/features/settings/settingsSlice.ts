import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AsyncThunk } from '@reduxjs/toolkit';
import { getSettings, saveSettings as saveSettingsRequest } from '../../api/settings.ts';
import type { Settings } from '../../types/settings.ts';

export interface SettingsState {
  settings: Settings | null;
  missing: boolean;
  loading: boolean;
  error: string | null;
  saving: boolean;
  saveError: string | null;
  saveSuccess: boolean;
}

const initialState: SettingsState = {
  settings: null,
  missing: false,
  loading: false,
  error: null,
  saving: false,
  saveError: null,
  saveSuccess: false,
};

export const fetchSettings: AsyncThunk<Settings | null, void, object> = createAsyncThunk(
  'settings/fetchSettings',
  async () => {
    return getSettings();
  },
);

export const saveSettings: AsyncThunk<Settings, Settings, object> = createAsyncThunk(
  'settings/saveSettings',
  async (settings) => {
    return saveSettingsRequest(settings);
  },
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
        state.missing = action.payload === null;
        state.error = null;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.missing = false;
        state.error = action.error.message ?? 'Failed to fetch settings';
      })
      .addCase(saveSettings.pending, (state) => {
        state.saving = true;
        state.saveError = null;
        state.saveSuccess = false;
      })
      .addCase(saveSettings.fulfilled, (state, action) => {
        state.saving = false;
        state.saveError = null;
        state.saveSuccess = true;
        state.missing = false;
        state.settings = action.payload;
      })
      .addCase(saveSettings.rejected, (state, action) => {
        state.saving = false;
        state.saveError = action.error.message ?? 'Failed to save settings';
        state.saveSuccess = false;
      });
  },
});

export default settingsSlice.reducer;
