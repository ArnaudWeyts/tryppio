export const ROUTE_TO_PAGE = 'ROUTE_TO_PAGE';

export function routeToPage(page: string) {
  return {
    page,
    type: ROUTE_TO_PAGE
  };
}
