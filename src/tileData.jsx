import React from 'react';
import { ListItem, ListItemText } from 'material-ui/List';

export const primaryRules = (
    <div>
        <ListItem button>
            <ListItemText primary="Ticketing rules" />
        </ListItem>
        <ListItem button>
            <ListItemText primary="Booking rules" />
        </ListItem>
        <ListItem button>
            <ListItemText primary="Shopping rules" />
        </ListItem>
    </div>
);

export const secondaryRules = (
    <div>
        <ListItem button>
            <ListItemText primary="ATC" />
        </ListItem>
        <ListItem button>
            <ListItemText primary="Point of sales" />
        </ListItem>
    </div>
);
