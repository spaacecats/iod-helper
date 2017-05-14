		// x,y,z,zone,questid
const  	GIANT = [50121.215,-72670.48,-5719.476,13,2328],
		NAGA = [56052.35,-72232.47,-5706.454,13,2327],
		HYDRATH = [64306.168,-68541.08,-3892.01,13,2329],
		TERALITH = [66668.55,-84120.180,-3620.446,13,2324],
		FIMBRILISK = [61067.145,-83993.953,-4174.835,13,2325],
		FANGSPAWN = [51726.676,-80452.719,-4596.697,13,2326],
		BASILISK = [83458.734,-80850.008,-4504.592,13,2321],
		ORISK = [77876.539,-81839.813,-4348.413,13,2322],
		OVOLITH = [71655.563,-85036.711,-3592.488,13,2323] 
		
	module.exports = function IodHelper(dispatch) {
	let enabled = true,
		iodNow = false,
		qid,
		myX,
		myY,
		myZ

	  dispatch.hook('C_CHECK_EVENT_MATCHING_LIST_CHECKBOX', 1, event => {
		qid = event.id
		if(!enabled) return
		else if (qid == 2321){ 
			iodNow = true
			setCoordinates(BASILISK)
			tpIod(qid)
			}
		else if (qid == 2322){ 
			iodNow = true
			setCoordinates(ORISK)
			tpIod(qid)		
			}
		else if (qid == 2323){ 
			iodNow = true
			setCoordinates(OVOLITH)
			tpIod(qid)	
			}
		else if (qid == 2324){ 
			iodNow = true
			setCoordinates(TERALITH)
			tpIod(qid)		
			}
		else if (qid == 2325){ 
			iodNow = true
			setCoordinates(FIMBRILISK)
			tpIod(qid)		
			}
		else if (qid == 2326){ 
			iodNow = true
			setCoordinates(FANGSPAWN)
			tpIod(qid)			
			}
		else if (qid == 2327){ 
			iodNow = true
			setCoordinates(NAGA)
			tpIod(qid)			
			}
		else if (qid == 2328){ 
			iodNow = true
			setCoordinates(GIANT)
			tpIod(qid)			
			}
		else if (qid == 2329){ 
			iodNow = true
			setCoordinates(HYDRATH)
			tpIod(qid)			
			}
			return true
	 })
	
	dispatch.hook('S_LOAD_TOPO', 1, event => {
		if(iodNow){
			event.x = myX
			event.y = myY
			event.z = myZ
			return true
		}
	})
	
	dispatch.hook('S_SPAWN_ME', 1, event => {
		if(iodNow){
			event.x = myX
			event.y = myY
			event.z = myZ
			iodNow = false
			return true
		}
	})
	
	dispatch.hook('C_PLAYER_LOCATION', 1, event => {iodNow = false})
	
	dispatch.hook('C_CHAT', 1, (event) => {
		if(event.message.includes("iod")) {
			enabled = !enabled;
			message(` IoD-helper toggled: ${enabled}`);
			return false
		}
	})
	
	function setCoordinates(POSITION){
		myX = POSITION[0]
		myY = POSITION[1]
		myZ = POSITION[2]
	}
	
	function tpIod(questId){
		dispatch.toServer('C_SELECT_EVENT_MATCHING', 1,{
			id: questId
			
		});
	}
	
	function message(msg) {
		dispatch.toClient('S_CHAT', 1, {
			channel: 24,
			authorID: 0,
			unk1: 0,
			gm: 0,
			unk2: 0,
			authorName: '',
			message: '(proxy)' + msg
		})
	}
}
