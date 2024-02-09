// Trial Draw Code



function GetTrialCoordUp( x, y, lngth ){
	var point_coordinaters = { x1:0, y1:0, x2:0, y2:0, x3:0, y3:0 };
	point_coordinaters.x1 = x;
	point_coordinaters.y1 = y + ( 2 / 3) * lngth; 	
	point_coordinaters.x2 = x + (lngth / 2 );
	point_coordinaters.y2 = y - ( 1 / 3) * lngth;
	point_coordinaters.x3 = x - (lngth / 2);
	point_coordinaters.y3 = y - ( 1 / 3) * lngth;
	return point_coordinaters;
}


function GetTrialCoordDawn( x, y, lngth ){
	var point_coordinaters = { x1:0, y1:0, x2:0, y2:0, x3:0, y3:0 };
	point_coordinaters.x1 = x;
	point_coordinaters.y1 = y - ( 2 / 3) * lngth;  	
	point_coordinaters.x2 = x + (lngth / 2 );
	point_coordinaters.y2 = y + ( 1 / 3) * lngth ;
	point_coordinaters.x3 = x - (lngth / 2);
	point_coordinaters.y3 = y + ( 1 / 3) * lngth;
	return point_coordinaters;
}

function DrawTrial( cnCnt, ptCrd ){
	cnCnt.beginPath();
	cnCnt.moveTo( ptCrd.x1, ptCrd.y1 );
	cnCnt.lineTo( ptCrd.x2, ptCrd.y2 );
	cnCnt.lineTo( ptCrd.x3, ptCrd.y3 );
	cnCnt.lineTo( ptCrd.x1, ptCrd.y1 );
	cnCnt.fill();
	cnCnt.stroke();
}

function DrawUpTrial( cnCnt, x, y, lngth ){
	let ptCrd = GetTrialCoordUp( x, y, lngth );
	//cnCnt.fillStyle = "black";
	DrawTrial( cnCnt, ptCrd );
}

function DrawDawnTrial( cnCnt, x, y, lngth ){
	let ptCrd = GetTrialCoordDawn( x, y, lngth );
	//cnCnt.fillStyle = "red";
	DrawTrial( cnCnt, ptCrd );
}

function redraw_TriaL( cnCnt, cntr_x, cntr_y, LengS ){
	let lenHalf = LengS / 2;
	let distancex = LengS /2;
	let distancey = distancex * 2;
	let ln1 = (1/3) *LengS;
	let ln2 =  (2/3) *LengS;	
	 if((cntr_x % 2) ){
			
			if( (cntr_y % 2) ){

				DrawUpTrial(cnCnt,(cntr_x  ) * distancex , (cntr_y ) * distancey, LengS );
				
			} else {
				 DrawDawnTrial(cnCnt,(cntr_x ) * distancex , (cntr_y ) * distancey +ln1, LengS );
				
			}
			
		} else {
			
			 if ( !(cntr_y % 2) ){
				   DrawUpTrial(cnCnt, (cntr_x ) * distancex , cntr_y * distancey  , LengS);
				
			 } else {
				   DrawDawnTrial(cnCnt,(cntr_x ) * distancex , cntr_y * distancey +ln1, LengS );
				
			 }
			
		 }
};


function DrawSWGTrial( cntr_x, cntr_y, LengS ){
    let distancex = LengS /2;
	let distancey = distancex * 2;
	let ln1 = (1/3) *LengS;
	let ret_parts;
	let coord;
						if((cntr_x % 2) ){
							if( (cntr_y % 2) ) {
							coord = GetTrialCoordUp( (cntr_x  ) * distancex , (cntr_y ) * distancey, LengS ); 
				ret_parts = ` M${coord.x1},${coord.y1} L${coord.x2} ${coord.y2} L${coord.x3} ${coord.y3} Z `;
							} else {
							coord = GetTrialCoordDawn( (cntr_x ) * distancex , (cntr_y ) * distancey +ln1, LengS ); 
				ret_parts = ` M${coord.x1},${coord.y1} L${coord.x2} ${coord.y2} L${coord.x3} ${coord.y3} Z`;
							}
						} else {
							if( !(cntr_y % 2) ) {
							coord = GetTrialCoordUp( (cntr_x ) * distancex , cntr_y * distancey  , LengS ); 
				ret_parts = `  M${coord.x1},${coord.y1} L${coord.x2} ${coord.y2} L${coord.x3} ${coord.y3} Z `;
							} else {
							coord = GetTrialCoordDawn( (cntr_x ) * distancex , cntr_y * distancey +ln1, LengS ); 
				ret_parts = ` M${coord.x1},${coord.y1} L${coord.x2} ${coord.y2} L${coord.x3} ${coord.y3} Z`;
							}
						}
	return ret_parts;
}


