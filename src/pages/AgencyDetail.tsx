import { useState } from 'react';
import { useTranslation } from "react-i18next";
import Breadcrumb from '../components/Breadcrumb';
import { UIButton } from '../components/Button';
import { CardAvatar } from '../components/CardAvatar';
import { HorizontalCardList, HorizontalCardListItem } from '../components/HorizontalCardList';
import { SubAgencyTable } from '../components/Tables/SubAgencyTable';
import { subAgencyData } from '../data/subAgencyData';

export default function AgencyDetail() {

    const { t } = useTranslation("common");
    const [loading, setLoading] = useState(false);
    return (
    <div className="min-vh-100 bg-light">
    <div className="container-fluid py-3 px-4">
            <Breadcrumb title="Back" hasBack rightContent={
            <div className="d-flex gap-2">
            <UIButton
            variant="outline-primary"
            icon="bi bi-envelope"
            >
            Resend the Voucher
            </UIButton>
            <UIButton
            variant="outline-primary"
            icon="bi bi-pencil"
            >
            Modify Voucher Data
            </UIButton>
            </div>
            } />
            <div className="card shadow">
                <div className="p-4">
                <CardAvatar     
                    avatarUrl="https://placehold.co/80x80"
                    name="Adventure Tours"
                    status="Pendiente"
                    email="adventuretours@mail.com"
                    phone="+50768934567"
                    location="La Palma, Panama"
                    />
                <div className="">
                        <HorizontalCardList desktopCols={6}>
                        <HorizontalCardListItem 
                            title="Total Sales"
                            value="$1529.00"
                            icon={""}
                            tooltip='Total sales from all policies'
                        />
                        <HorizontalCardListItem 
                            title="Standing Quote Value"
                            value="$0.00"
                            icon={""}
                        />
                        <HorizontalCardListItem 
                            title="Total Commission Paid"
                            value="$0.25"
                            icon={""}
                            tooltip="Total commission paid from all policies"
                        />
                        <HorizontalCardListItem 
                            title="Number of agents"
                            value="0"
                            icon={""}
                        />
                        <HorizontalCardListItem 
                            title="Commission Percentage"
                            value="10%"
                            icon={""}
                        />
                        <HorizontalCardListItem 
                            title="Number of Sub agents"
                            value="0"
                            icon={""}
                        />
                        </HorizontalCardList>
                </div>
                <div className="mt-4">
                    <h5 className="mb-4">Traveler(s)</h5>
                    <div className="row">
                            <SubAgencyTable
                                data={subAgencyData}
                                loading={loading}
                                sort={{ sortBy: 'name', sortDir: 'desc' }}
                                onSortChange={({ id, dir }) => {
                                    console.log(id, dir);
                                }}
                                />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}