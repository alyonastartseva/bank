import React from "react";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "@/app/store/store.ts";
import {MemoryRouter} from "react-router-dom";

export function renderWithProviders(ui: React.ReactElement) {
    return render(
        <Provider store={store}>
            <MemoryRouter>
                {ui}
            </MemoryRouter>
        </Provider>
    )
}