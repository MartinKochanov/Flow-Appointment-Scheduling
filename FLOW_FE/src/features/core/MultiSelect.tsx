import { UIEvent, useEffect, useState } from "react";
import {
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    FormControl,
    InputLabel,
} from "@mui/material";
import { Controller } from "react-hook-form";
import usePaginatedQuery from "../../hooks/usePaginatedQuery";
import { useServices } from "../../hooks/useServicesQuery";
import { Service } from "../../types/Service";

interface MultiSelectProps {
    label: string;
    name: string;
    control: any;
    open: boolean;
    defaultValue: number[] | undefined;
}

const MultiSelect = ({
    label,
    name,
    control,
    open,
    defaultValue,
}: MultiSelectProps) => {
    const { data, isLoading, error, page, handlePageChange } =
        usePaginatedQuery(useServices);

    const [services, setServices] = useState<Service[]>([]);
    const [initialLoadDone, setInitialLoadDone] = useState(false);

    useEffect(() => {
        if (!open) {
            setServices([]);
            handlePageChange(null, 0);
            setInitialLoadDone(false);
        }
    }, [open]);

    useEffect(() => {
        if (data) {
            setServices((prevServices) => {
                const updatedServices = [...prevServices, ...data.content];
                const uniqueServices = Array.from(
                    new Map(
                        updatedServices.map((item) => [item.id, item])
                    ).values()
                );
                return uniqueServices;
            });
        }
    }, [data]);

    useEffect(() => {
        if (open && defaultValue && !initialLoadDone) {
            const selectedIds = defaultValue || [];

            const loadedServiceIds = services.map((service) => service.id);
            const missingIds = selectedIds.filter(
                (id: number) => !loadedServiceIds.includes(id)
            );

            if (missingIds.length > 0 && !isLoading) {
                handlePageChange(null, page + 1);
            } else {
                setInitialLoadDone(true);
            }
        }
    }, [
        open,
        control,
        services,
        page,
        isLoading,
        initialLoadDone,
        handlePageChange,
    ]);

    const handleScroll = (event: UIEvent<HTMLDivElement>) => {
        const bottom =
            event.currentTarget.scrollHeight ===
            event.currentTarget.scrollTop + event.currentTarget.clientHeight;
        if (bottom && !isLoading) {
            handlePageChange(null, page + 1);
        }
    };

    return (
        <FormControl color="secondary" fullWidth margin="normal">
            <InputLabel>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                    <Select
                        multiple
                        value={field.value || []}
                        onChange={(event) =>
                            field.onChange(event.target.value as number[])
                        }
                        renderValue={(selected) =>
                            services
                                .filter((service) =>
                                    selected.includes(service.id)
                                )
                                .map((service) => service.name)
                                .join(", ")
                        }
                        onScroll={handleScroll}
                        MenuProps={{
                            PaperProps: {
                                onScroll: handleScroll,
                                sx: {
                                    height: 500,
                                },
                            },
                        }}
                    >
                        {services.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                <Checkbox
                                    color="secondary"
                                    checked={field.value.includes(option.id)}
                                />
                                <ListItemText primary={option.name} />
                            </MenuItem>
                        ))}
                        {isLoading && <MenuItem disabled>Loading...</MenuItem>}
                        {error && (
                            <MenuItem disabled>Error loading services</MenuItem>
                        )}
                    </Select>
                )}
            />
        </FormControl>
    );
};

export default MultiSelect;
