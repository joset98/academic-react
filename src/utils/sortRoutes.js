
const sortingRoutes = ( menuArray ) => {
    if (!menuArray) return []; 
    return [...menuArray].sort( ( firstItem, seconItem) => {

        if(firstItem === 'ADMINISTRATIVO.PREMATRICULA' && seconItem === 'ADMINISTRATIVO.ESTUDIANTES')	
            return 1;

        if(seconItem === 'ADMINISTRATIVO.PREMATRICULA' && firstItem === 'ADMINISTRATIVO.ESTUDIANTES')
            return -1;

        if(firstItem === 'ADMINISTRATIVO.ESTUDIANTES')
            return -1;
        
        if(firstItem === 'ADMINISTRATIVO.PREMATRICULA')
            return -1;

        if(seconItem === 'ADMINISTRATIVO.PREMATRICULA')
            return 1;
    }); 
}

export default sortingRoutes;