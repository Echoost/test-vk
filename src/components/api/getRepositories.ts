export interface IRepositories {
    id: number;
    name: string;
    owner: IOwner;
    created_at: string;
}

interface IOwner {
    html_url: string;
    login: string;
    avatar_url: string;
}

export const getRepositories = async (
    page: number,
): Promise<IRepositories[]> => {
    const response = await fetch(
        `https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=${page}`,
    );

    const data = await response.json();
    return data.items;
};
