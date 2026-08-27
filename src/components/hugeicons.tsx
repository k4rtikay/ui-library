import type { ComponentProps } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    ArrowDown01Icon,
    ArrowRight01Icon,
    Cancel01Icon,
    CancelCircleIcon,
    CheckmarkCircle01Icon,
    CircleIcon as CircleShapeIcon,
    Copy01Icon,
    CubeIcon,
    DashboardSpeed01Icon,
    DashboardSquare01Icon,
    File02Icon,
    GithubIcon,
    Loading01Icon,
    LockIcon,
    ListViewIcon,
    Moon02Icon,
    SquareMousePointerIcon,
    PaletteIcon,
    Cards01Icon,
    PinIcon,
    Rocket01Icon,
    Search01Icon,
    LayoutLeftIcon,
    StarIcon,
    Sun01Icon,
    Tick01Icon,
} from "@hugeicons/core-free-icons";

type IconProps = ComponentProps<typeof HugeiconsIcon>;

function createIcon(icon: IconProps["icon"]) {
    return function Icon(props: Omit<IconProps, "icon">) {
        return <HugeiconsIcon icon={icon} {...props} />;
    };
}

export const CheckCircle2 = createIcon(CheckmarkCircle01Icon);
export const XCircle = createIcon(CancelCircleIcon);
export const Loader2 = createIcon(Loading01Icon);
export const Pin = createIcon(PinIcon);
export const Palette = createIcon(PaletteIcon);
export const Lock = createIcon(LockIcon);
export const LayoutDashboard = createIcon(DashboardSquare01Icon);
export const Gauge = createIcon(DashboardSpeed01Icon);
export const Search = createIcon(Search01Icon);
export const ChevronRight = createIcon(ArrowRight01Icon);
export const Star = createIcon(StarIcon);
export const ChevronDownIcon = createIcon(ArrowDown01Icon);
export const CheckIcon = createIcon(Tick01Icon);
export const ChevronRightIcon = createIcon(ArrowRight01Icon);
export const CircleIcon = createIcon(CircleShapeIcon);
export const XIcon = createIcon(Cancel01Icon);
export const Check = createIcon(Tick01Icon);
export const Copy = createIcon(Copy01Icon);
export const Github = createIcon(GithubIcon);
export const Sidebar = createIcon(LayoutLeftIcon);
export const Moon = createIcon(Moon02Icon);
export const Sun = createIcon(Sun01Icon);
export const Box = createIcon(CubeIcon);
export const FileText = createIcon(File02Icon);
export const MousePointerClick = createIcon(SquareMousePointerIcon);
export const PanelsTopLeft = createIcon(Cards01Icon);
export const Rocket = createIcon(Rocket01Icon);
export const Rows = createIcon(ListViewIcon);

export type HugeIcon = ReturnType<typeof createIcon>;
