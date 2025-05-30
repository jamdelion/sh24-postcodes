import "@testing-library/jest-dom";
import server from "./mockServer/server";

beforeAll(() => server.listen());

afterEach(() => {
    server.resetHandlers()
     vi.clearAllMocks();
})

afterAll(() => server.close());
