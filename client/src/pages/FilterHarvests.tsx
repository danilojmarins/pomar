import { useEffect, useState } from "react";
import { api } from "../services/api";
import { filteredHarvest } from "../types/filteredHarvest";
import { CardsContainer, PageTitle } from "./styles";
import HarvestStatsCard from "../components/Cards/harvestStats";
import FilterHarvestForm from "../components/Forms/filterHarvests";
import { useLocation } from "react-router-dom";

const FilterHarvests = () => {

    const [filteredHarvests, setFilteredHarvests] = useState<filteredHarvest[]>([]);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tree_id = queryParams.get('tree_id');
    const group_id = queryParams.get('group_id');
    const species_id = queryParams.get('species_id');

    useEffect(() => {
        api.get('/harvests/get/filterHarvests', {
            params: {
                tree_id,
                group_id,
                species_id
            }
        })
        .then((res) => {
            console.log(res)
            setFilteredHarvests(res.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [tree_id, group_id, species_id]);

    return (
        <>
            <PageTitle>
                <h2>Relatório Colheitas</h2>
                <h3>Total: {filteredHarvests.length}</h3>
            </PageTitle>

            <FilterHarvestForm />

            <CardsContainer>
                {filteredHarvests && filteredHarvests[0] && filteredHarvests.map((harvest) => {
                    return (
                        <HarvestStatsCard
                            filteredHarvest={harvest}
                        />
                    )
                })}
            </CardsContainer>
        </>
    )
}

export default FilterHarvests;