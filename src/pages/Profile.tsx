import { useEffect, useMemo, useRef, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import Breadcrumb from '../components/Breadcrumb';
import { Avatar } from '../components/Avatar';
import ProfilePersonalForm, { type ProfilePersonalFormData } from '../components/Forms/ProfilePersonalForm';
import ProfileAddressForm, { type ProfileAddressFormData } from '../components/Forms/ProfileAddressForm';
import ProfileLanguageForm, { type ProfileLanguageFormData } from '../components/Forms/ProfileLanguageForm';
import {
  getGetPerfilAgenteQueryKey,
  useActualizarPerfilAgente,
  useCambiarImagenPerfilAgente,
  useGetPerfilAgente,
} from '../api/generated';
import type { ActualizarPerfilAgenteBody } from '../api/schemas';
import { useCountryOptions } from '../hooks/useCountryOptions';
import { useI18nCache } from '../i18n/i18nCacheProvider';
import { parseSecurityRole, SecurityRole } from '../stores/SecurityRole';
import { toast } from '../services/toast';
import { getApiErrorMessage } from '../api/errors/ApiError';

const PHOTO_MAX_BYTES = 5 * 1024 * 1024;
const PHOTO_TYPES = ['image/jpeg', 'image/png'];

// El servicio acepta la imagen en base64 con prefijo data URI
const readAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => (typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('read')));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

function Profile() {
  const { t } = useTranslation();
  const { lang, setLang } = useI18nCache();
  const queryClient = useQueryClient();
  const countryOptions = useCountryOptions();

  const { data, isLoading, error } = useGetPerfilAgente(lang);
  const { mutateAsync: actualizarPerfilAgente } = useActualizarPerfilAgente();
  const { mutateAsync: cambiarImagen, isPending: isSavingPhoto } = useCambiarImagenPerfilAgente();
  const photoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error) {
      toast.error("Error", getApiErrorMessage(error, t('error_generico')));
    }
  }, [error, t]);

  const profile = data?.data;

  // Memorizados: los formularios hacen reset cada vez que cambian sus initialValues
  const personalValues = useMemo<ProfilePersonalFormData>(() => ({
    nombre: profile?.nombre ?? '',
    apellido: profile?.apellido ?? '',
    phone: profile?.telefono ?? '',
    whatsapp: profile?.whatsapp ?? '',
    correoAlternativo: profile?.correo_renovaciones_alternativo ?? '',
    emailNotifications: !!profile?.recibir_correos_renovaciones,
  }), [profile]);

  const addressValues = useMemo<ProfileAddressFormData>(() => ({
    pais: profile?.pais?.id ? String(profile.pais.id) : '',
  }), [profile]);

  const languageValues = useMemo<ProfileLanguageFormData>(() => ({
    language: profile?.idioma_user || profile?.idioma || lang,
  }), [profile, lang]);

  const role = profile ? parseSecurityRole(profile.roles) : null;
  const roleLabel = role === SecurityRole.AGENT_ADMIN
    ? t('agents.roleAgentAdmin')
    : role === SecurityRole.AGENT ? t('agents.roleAgent') : '—';

  // pais.nombre llega en false cuando el agente no tiene país asignado
  const countryName = typeof profile?.pais?.nombre === 'string' && profile.pais.nombre ? profile.pais.nombre : '—';
  const fullName = profile?.nombre_completo || `${profile?.nombre ?? ''} ${profile?.apellido ?? ''}`.trim() || '—';

  // Guarda en POST /perfil y refresca el perfil; si falla lo propaga para que el formulario marque los campos
  const savePerfil = async (body: ActualizarPerfilAgenteBody) => {
    try {
      await actualizarPerfilAgente({ idioma: lang, data: body });
      await queryClient.invalidateQueries({ queryKey: getGetPerfilAgenteQueryKey(lang) });
      toast.success(t("feedback.savedTitle"), t("feedback.saved"));
    } catch (e) {
      toast.error("Error", getApiErrorMessage(e, t('error_generico')));
      throw e;
    }
  };

  // POST /perfil/imagen; cadena vacía quita la foto
  const savePhoto = async (imagen: string) => {
    try {
      await cambiarImagen({ idioma: lang, data: { imagen } });
      await queryClient.invalidateQueries({ queryKey: getGetPerfilAgenteQueryKey(lang) });
      toast.success(t("feedback.savedTitle"), t("feedback.saved"));
    } catch (e) {
      toast.error("Error", getApiErrorMessage(e, t('error_generico')));
    }
  };

  const onPhotoSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Permite volver a elegir el mismo archivo
    event.target.value = '';
    if (!file) return;

    if (!PHOTO_TYPES.includes(file.type)) {
      toast.error("Error", t('myProfile.photoInvalidType'));
      return;
    }
    if (file.size > PHOTO_MAX_BYTES) {
      toast.error("Error", t('myProfile.photoTooLarge'));
      return;
    }

    try {
      await savePhoto(await readAsDataUrl(file));
    } catch {
      toast.error("Error", t('error_generico'));
    }
  };

  const onPersonalSubmit = (values: ProfilePersonalFormData) =>
    savePerfil({
      nombre: values.nombre,
      apellido: values.apellido,
      telefono: values.phone,
      whatsapp: values.whatsapp,
      correo_renovaciones_alternativo: values.correoAlternativo,
      recibir_correos_renovaciones: values.emailNotifications,
    });

  const onAddressSubmit = (values: ProfileAddressFormData) =>
    savePerfil({ pais: values.pais ? Number(values.pais) : undefined });

  const onLanguageSubmit = async (values: ProfileLanguageFormData) => {
    await savePerfil({ idioma: values.language });
    if (values.language !== lang) setLang(values.language);
  };

  const renderBody = () => {
    if (isLoading) {
      return (
        <div className="d-flex justify-content-center p-5">
          <div className="spinner-border" role="status" />
        </div>
      );
    }

    if (!profile) {
      return <div className="border rounded-4 p-4 text-muted">{t('noData')}</div>;
    }

    return (
      <div className="d-flex flex-column gap-4">
        <div className="border rounded-3 p-4 d-flex flex-column flex-md-row align-items-center gap-4">
          <div className="position-relative flex-shrink-0">
            <Avatar src={profile.imagen || undefined} name={fullName} size={120} />
            {isSavingPhoto && (
              <div className="position-absolute top-50 start-50 translate-middle">
                <div className="spinner-border spinner-border-sm text-light" role="status" />
              </div>
            )}
            <input
              ref={photoInputRef}
              type="file"
              accept={PHOTO_TYPES.join(',')}
              className="d-none"
              onChange={onPhotoSelected}
            />
            <button
              type="button"
              className="btn btn-light rounded-circle position-absolute bottom-0 end-0 p-1 lh-1 border"
              disabled={isSavingPhoto}
              onClick={() => photoInputRef.current?.click()}
              aria-label={t('myProfile.changePhoto')}
              title={t('myProfile.changePhoto')}
            >
              <i className="bi bi-camera-fill"></i>
            </button>
            {profile.imagen && (
              <button
                type="button"
                className="btn btn-light rounded-circle position-absolute bottom-0 start-0 p-1 lh-1 border"
                disabled={isSavingPhoto}
                onClick={() => savePhoto('')}
                aria-label={t('myProfile.removePhoto')}
                title={t('myProfile.removePhoto')}
              >
                <i className="bi bi-trash"></i>
              </button>
            )}
          </div>
          <div className="flex-grow-1 text-center text-md-start">
            <h4 className="mb-2">{fullName}</h4>
            <p className="mb-1">{roleLabel}</p>
            <p className="mb-0 text-secondary">{countryName}</p>
          </div>
          {profile.qr && (
            <img src={profile.qr} alt="QR" className="flex-shrink-0" style={{ width: 120, height: 120 }} />
          )}
        </div>

        <ProfilePersonalForm
          initialValues={personalValues}
          email={profile.email ?? ''}
          role={roleLabel}
          onSubmit={onPersonalSubmit}
        />

        <ProfileAddressForm
          initialValues={addressValues}
          countryOptions={countryOptions}
          onSubmit={onAddressSubmit}
        />

        <ProfileLanguageForm
          initialValues={languageValues}
          onSubmit={onLanguageSubmit}
        />
      </div>
    );
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid py-3 px-4">
        <Breadcrumb title={t('myProfile.back')} hasBack />
        <div className="card shadow p-4">
          <h4 className="mb-4">{t('myProfile.title')}</h4>
          {renderBody()}
        </div>
      </div>
    </div>
  );
}

export default Profile;
