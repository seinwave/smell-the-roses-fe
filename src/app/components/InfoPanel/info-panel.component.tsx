'use-client';
import {
  Wrapper,
  Container,
  PictureContainer,
  Picture,
  NameRow,
  Name,
  GroupCategoryRow,
  BreedingRow,
  LocationRow,
  ShoppingRow,
  InfoContainer,
  SectorList,
} from './info-panel.style';
import useSWR from 'swr';
import type { Plant } from '@/app/map';

const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export function InfoPanel({ plant }: { plant: Plant }) {
  const { data, error } = useSWR(
    `http://localhost:4000/plants/${plant.id}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <Wrapper>
        <Container>
          <PictureContainer></PictureContainer>
          <InfoContainer>
            <NameRow></NameRow>
            <GroupCategoryRow></GroupCategoryRow>
            <BreedingRow></BreedingRow>
            <LocationRow>
              <SectorList> </SectorList>
            </LocationRow>
            <ShoppingRow>Link to a rose shopping website</ShoppingRow>
          </InfoContainer>
        </Container>
      </Wrapper>
    );

  const { name, group, category, breeder, year, sector } = data;

  return (
    <Wrapper>
      <Container>
        <PictureContainer>
          <Picture src="https://via.placeholder.com/400x200" />
        </PictureContainer>
        <InfoContainer>
          <NameRow>
            <Name>{name}</Name>
          </NameRow>
          <GroupCategoryRow>
            <div>{group}</div>
            <div>{category}</div>
          </GroupCategoryRow>
          <BreedingRow>
            {breeder} - {year}{' '}
          </BreedingRow>
          <LocationRow>
            <div># in garden -- </div>
            <SectorList> {sector}</SectorList>
          </LocationRow>
          <ShoppingRow>Link to a rose shopping website</ShoppingRow>
        </InfoContainer>
      </Container>
    </Wrapper>
  );
}
