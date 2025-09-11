import { OrganizationList } from "@clerk/nextjs";

export const OrgSelectionView = () => {
    return (
        <OrganizationList 
        hidePersonal={true}
        afterCreateOrganizationUrl="/"
        afterSelectOrganizationUrl="/"
        skipInvitationScreen={true}
        />
    )
}