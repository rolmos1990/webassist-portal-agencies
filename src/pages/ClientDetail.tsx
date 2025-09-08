import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CardAvatar } from '../components/CardAvatar';
import { HorizontalCardList, HorizontalCardListItem } from '../components/HorizontalCardList';
import { TabPanel } from '../components/TabPanel';
import { ListGroup } from '../components/ListGroup';
import { StatusBadge } from '../components/StatusBadge';

export default function ClientDetail() {
    const navigate = useNavigate();

    const noContent = 
                            <div className="border rounded-4 p-4 text-muted">
                              No standing quotes yet.
                            </div>;                        

    return (
<div className="min-vh-100 bg-light">
  <div className="container-fluid py-4">
    <div className="row">
      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3 mb-0">Detalle del cliente</h1>
            <Button variant="outline-primary" className="rounded-pill" onClick={() => navigate(-1)}>
                <i className="bi bi-plus-lg me-2"></i>Agregar agente
            </Button>
        </div>
        <div className="container-fluid card shadow">
            <div className="p-3">
                <CardAvatar 
                  avatarUrl="https://placehold.co/80x80"
                  name="Mateo Castillo"
                  status="Activo"
                  email="matoectl@mail.com"
                  phone="+50768934567"
                  location="La Palma, Panama"
                />
                <div className="container-fluid">
                    <HorizontalCardList>
                      <HorizontalCardListItem 
                        title="Total Premiums Paid"
                        value="$1529.00"
                        icon={""}
                      />
                      <HorizontalCardListItem 
                        title="Standing Quote Value"
                        value="$344.25"
                        icon={""}
                      />
                      <HorizontalCardListItem 
                        title="Total Commission Earned"
                        value="$344.25"
                        icon={""}
                        tooltip="Total commission earned from all policies"
                      />
                      <HorizontalCardListItem 
                        title="Number of Purchases"
                        value="5"
                        icon={""}
                      />
                      <HorizontalCardListItem 
                        title="Active Plans"
                        value="2"
                        icon={""}
                      />
                    </HorizontalCardList>
                </div>

                <div className="container-fluid mt-4">
                    <TabPanel 
                      tabs={[
                        {
                          id: 'plan-list',
                          title: 'Plan List',
                          content: (
                            <ListGroup 
                              items={[
                                [
                                  { title: 'Plan Number', value: 'A93-E2B5K9' },
                                  { title: 'Plan Name', value: 'Travel / Day Trips - DIAMOND' },
                                  { 
                                    title: 'Status', 
                                    value: <StatusBadge status="Activo" />
                                  },
                                  { title: 'Start Date', value: '05 Mar 2024' },
                                  { title: 'End Date', value: '05 Mar 2025' },
                                  { 
                                    title: 'Amount Paid', 
                                    value: '$1200.00',
                                    className: 'd-flex align-items-center justify-content-between'
                                  }
                                ],
                                [
                                  { title: 'Plan Number', value: 'B84-F3C6L0' },
                                  { title: 'Plan Name', value: 'Travel / Day Trips - GOLD' },
                                  { 
                                    title: 'Status', 
                                    value: <StatusBadge status="Activo" />
                                  },
                                  { title: 'Start Date', value: '15 Jan 2024' },
                                  { title: 'End Date', value: '15 Jan 2025' },
                                  { 
                                    title: 'Amount Paid', 
                                    value: '$950.00',
                                    className: 'd-flex align-items-center justify-content-between'
                                  }
                                ]
                              ]} 
                              onClick={(index) => {
                                // Handle row click if needed
                                console.log('Selected plan at index:', index);
                              }}
                            />
                          )
                        },
                        {
                          id: 'standing-quotes',
                          title: 'Standing Quotes',
                          content: noContent
                        }
                      ]}
                      defaultActiveTab="plan-list"
                    />
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>

    );
}