package com.vacuum.backend.controller;

import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.vacuum.backend.repo.AppointmentRepo;
import com.vacuum.backend.repo.BillRepo;
import com.vacuum.backend.repo.BookedDatesRepo;
import com.vacuum.backend.repo.ServiceRepo;
import com.vacuum.backend.repo.UserRepo;
import com.vacuum.backend.security.CustomUserDetails;
import com.vacuum.backend.entities.Appointment;
import com.vacuum.backend.entities.Bill;
import com.vacuum.backend.entities.BookedDates;
import com.vacuum.backend.entities.Service;
import com.vacuum.backend.entities.User;
import com.vacuum.backend.structure.AppointmentPayload;
import com.vacuum.backend.structure.InBookDates;

import ch.qos.logback.core.joran.conditional.ElseAction;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/")
public class AppointmentController {

    @Autowired
    UserRepo userrepo;

    @Autowired
    ServiceRepo servicerepo;

    @Autowired
    BillRepo Billrepo;

    @Autowired
    AppointmentRepo appointrepo;

    @Autowired
    BookedDatesRepo bookrepo;

    @PostMapping("/saveappoint")
    public String saveAppoint(@RequestBody AppointmentPayload payload) throws ParseException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User u = userrepo.findByUid(userDetails.getId()).get();
        Appointment a = new Appointment();
        Bill b = new Bill();
        Service service = servicerepo.findBySid(payload.getSid());
        a.setDate(new SimpleDateFormat("yyyy-MM-dd").parse(payload.getDate()));
        a.setDetails(payload.getDetails());
        a.setModel(payload.getModel());
        a.setTier(payload.getTier());
        a.setStatus("unpaid");
        a.setScode(service.getScode());
        a.setSname(service.getName());
        a.setSid(payload.getSid());
        u.getAppointments().add(a);

        int base = service.getPrice();
        String t = payload.getTier();
        if (t.equals("1"))
            b.setTiervalue(10);
        else if (t.equals("2"))
            b.setTiervalue(25);
        else if (t.equals("3"))
            b.setTiervalue(45);
        else
            b.setTiervalue(5);
        b.setPrice(base);
        b.setAftertax(base * (0.18));
        b.setDate(new SimpleDateFormat("yyyy-MM-dd").parse(payload.getDate()));
        b.setFinalprice(b.getPrice() + b.getTiervalue() + b.getAftertax());
        // b.setAppointment(a);
        a.setBill(b);

        userrepo.save(u);

        return "success";

    }

    @Transactional
    @GetMapping(value = "/deleteAppointment")
    public String deleteService(@RequestParam("aid") int aid) {
        Appointment appoint = appointrepo.findByAid(aid).get();
        Date d = appoint.getDate();
        Date curr = new Date();
        double diffInMillies = Math.abs(d.getTime() - curr.getTime());
        // double diff = TimeUnit.HOURS.convert(diffInMillies, TimeUnit.MILLISECONDS);
        double diff = (d.getTime() - curr.getTime() ) / (1000 * 60 * 60 * 24);
        DecimalFormat df = new DecimalFormat("0.#####");
        df.setRoundingMode(RoundingMode.DOWN);
        Double outputNum = Double.valueOf(df.format(diff));
        int di= outputNum.intValue();
        BookedDates bd = bookrepo.findByDateandSid(d,appoint.getSid());
        bookrepo.delete(bd);
        long records = appointrepo.deleteByAid(aid);

        return "success";
    }

    @GetMapping(value = "/getAppointments")
    public List<Appointment> getService() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = userrepo.findByUid(userDetails.getId()).get();
        List<Appointment> appoints = user.getAppointments();
        return appoints;
    }

    @GetMapping(value = "/payAppointment")
    public String payAppointment(@RequestParam("aid") int aid) {
        Appointment appoint = appointrepo.findByAid(aid).get();
        appoint.setStatus("Paid");
        appointrepo.save(appoint);
        return "success";
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(value = "/getPendingAppointments")
    public List<Appointment> getPendingAppointments() {
        List<Appointment> appoints = appointrepo.findPending();
        return appoints;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(value = "/completeAppointment")
    public String completeAppointment(@RequestParam("aid") int aid) {
        Appointment appoint = appointrepo.findByAid(aid).get();
        appoint.setCompletion(true);
        appointrepo.save(appoint);
        return "success";
    }

}
