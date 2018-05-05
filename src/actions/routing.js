export const ROUTE_TO_PAGE = 'ROUTE_TO_PAGE';

export function routeToPage(page) {
  return {
    type: ROUTE_TO_PAGE,
    page,
  };
}
