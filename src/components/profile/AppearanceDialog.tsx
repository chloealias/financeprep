import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProfileAppearanceEditor } from "@/components/profile/ProfileAppearanceEditor";
import type { UserProfile } from "@/lib/profile-storage";

type AppearanceDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: UserProfile;
  onChange: (patch: Partial<UserProfile>) => void;
};

/** Modale apparence — ne rien rendre dans le DOM tant qu’elle est fermée. */
export function AppearanceDialog({ open, onOpenChange, profile, onChange }: AppearanceDialogProps) {
  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-foreground">Apparence</DialogTitle>
        </DialogHeader>
        <ProfileAppearanceEditor profile={profile} onChange={onChange} showAppPreview />
      </DialogContent>
    </Dialog>
  );
}
