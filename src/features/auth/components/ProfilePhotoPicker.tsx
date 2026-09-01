type ProfilePhotoPickerProps = {
  previewUrl?: string | null;
  onSelect: (file: File) => void;
};

export function ProfilePhotoPicker({
  previewUrl,
  onSelect,
}: ProfilePhotoPickerProps) {
  return (
    <div className="profile-photo-picker">
      <div className="profile-photo-circle">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Vista previa de perfil"
            className="h-full w-full object-cover"
          />
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-16 w-16 text-[#9a9a9a]"
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M5 20c1.5-2.5 4-4 7-4s5.5 1.5 7 4" />
          </svg>
        )}
      </div>

      <label className="profile-photo-camera-button">
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              onSelect(file);
            }
          }}
        />
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M4 7h3l2-2h6l2 2h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
      </label>
    </div>
  );
}
