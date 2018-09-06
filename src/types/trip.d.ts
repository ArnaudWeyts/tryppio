interface ITripProps {
  trip: ITrip;
  calculate: (event: React.MouseEvent<HTMLElement>) => void;
  reset: (event: React.MouseEvent<HTMLElement>) => void;
  routeToMap: (event: React.MouseEvent<HTMLElement>) => void;
}
